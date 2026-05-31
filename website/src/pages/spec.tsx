import type {ReactNode} from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './spec.module.css';

interface VersionInfo {
  version: string;
  file: string;
  date: string;
  external?: boolean;
}

const specs: Record<string, {title: string; versions: VersionInfo[]}> = {
  tgki: {
    title: '第3世代カーネル（ITRON系）統合仕様書',
    versions: [
      {version: '3.7.0', file: 'https://www.toppers.jp/docs/tech/tgki_spec-370/tgki_spec-370.html', date: '2024-05-28', external: true},
      {version: '3.6.0', file: 'https://www.toppers.jp/docs/tech/tgki_spec-360/tgki_spec-360.html', date: '2023-03-30', external: true},
      {version: '3.5.0', file: 'tgki_spec-350.html', date: '2019-03-27'},
      {version: '3.4.2', file: 'tgki_spec-342.html', date: '2018-04-18'},
      {version: '3.4.1', file: 'tgki_spec-341.html', date: '2017-07-17'},
      {version: '3.4.0', file: 'tgki_spec-340.html', date: '2017-07-10'},
      {version: '3.3.0', file: 'tgki_spec-330.html', date: '2015-05-11'},
      {version: '3.2.1', file: 'tgki_spec-321_richtext.html', date: '2014-10-01'},
    ],
  },
  ngki: {
    title: '新世代カーネル統合仕様書',
    versions: [
      {version: '1.7.1', file: 'ngki_spec-171.html', date: '2019-10-07'},
    ],
  },
};

function getParams(): {series: string; version: string | null} {
  if (typeof window === 'undefined') return {series: 'tgki', version: null};
  const params = new URLSearchParams(window.location.search);
  return {
    series: params.get('s') || 'tgki',
    version: params.get('v'),
  };
}

function clearHighlights(doc: Document) {
  doc.querySelectorAll('mark[data-spec-search]').forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(doc.createTextNode(mark.textContent || ''), mark);
      parent.normalize();
    }
  });
}

function highlightText(doc: Document, query: string): number {
  clearHighlights(doc);
  if (!query) return 0;

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const matches: {node: Text; index: number}[] = [];
  const lowerQuery = query.toLowerCase();

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const tag = node.parentElement?.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') continue;
    let idx = node.textContent?.toLowerCase().indexOf(lowerQuery) ?? -1;
    while (idx !== -1) {
      matches.push({node, index: idx});
      idx = node.textContent?.toLowerCase().indexOf(lowerQuery, idx + lowerQuery.length) ?? -1;
    }
  }

  for (let i = matches.length - 1; i >= 0; i--) {
    const {node: textNode, index} = matches[i];
    const range = doc.createRange();
    range.setStart(textNode, index);
    range.setEnd(textNode, index + query.length);
    const mark = doc.createElement('mark');
    mark.setAttribute('data-spec-search', '');
    mark.style.backgroundColor = '#ffeb3b';
    mark.style.color = '#000';
    mark.style.padding = '0 1px';
    range.surroundContents(mark);
  }

  return matches.length;
}

function SearchBar({
  iframeRef,
  isExternal,
  externalUrl,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  isExternal: boolean;
  externalUrl: string;
}): ReactNode {
  const [query, setQuery] = useState('');
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [currentMatch, setCurrentMatch] = useState(0);

  const doSearch = useCallback(() => {
    if (!iframeRef.current) return;
    try {
      const doc = iframeRef.current.contentDocument;
      if (!doc) return;
      const count = highlightText(doc, query);
      setMatchCount(count);
      setCurrentMatch(0);
      if (count > 0) {
        const first = doc.querySelector('mark[data-spec-search]');
        first?.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    } catch {
      setMatchCount(-1);
    }
  }, [query, iframeRef]);

  const jumpToMatch = useCallback(
    (direction: 1 | -1) => {
      if (!iframeRef.current || matchCount === null || matchCount <= 0) return;
      try {
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;
        const marks = doc.querySelectorAll('mark[data-spec-search]');
        const next =
          (currentMatch + direction + marks.length) % marks.length;
        setCurrentMatch(next);
        (marks[next] as HTMLElement).style.backgroundColor = '#ff9800';
        if (marks[currentMatch]) {
          (marks[currentMatch] as HTMLElement).style.backgroundColor = '#ffeb3b';
        }
        marks[next]?.scrollIntoView({behavior: 'smooth', block: 'center'});
      } catch {
        // cross-origin
      }
    },
    [iframeRef, matchCount, currentMatch],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setMatchCount(null);
    setCurrentMatch(0);
    if (!iframeRef.current) return;
    try {
      const doc = iframeRef.current.contentDocument;
      if (doc) clearHighlights(doc);
    } catch {
      // cross-origin
    }
  }, [iframeRef]);

  if (isExternal) {
    return (
      <div className={styles.searchBar}>
        <span className={styles.searchNote}>
          外部ページのため、ページ内検索はブラウザで直接開いてください
        </span>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openButton}>
          新しいタブで開く
        </a>
      </div>
    );
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputGroup}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="ページ内検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.shiftKey ? jumpToMatch(-1) : matchCount === null ? doSearch() : jumpToMatch(1);
            }
          }}
        />
        {query && (
          <button className={styles.searchClear} onClick={handleClear}>
            &times;
          </button>
        )}
      </div>
      <button className={styles.searchButton} onClick={doSearch}>
        検索
      </button>
      {matchCount !== null && matchCount >= 0 && (
        <>
          <span className={styles.searchCount}>
            {matchCount > 0
              ? `${currentMatch + 1} / ${matchCount}件`
              : '一致なし'}
          </span>
          {matchCount > 1 && (
            <>
              <button className={styles.searchNav} onClick={() => jumpToMatch(-1)}>
                &#9650;
              </button>
              <button className={styles.searchNav} onClick={() => jumpToMatch(1)}>
                &#9660;
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function SpecViewer(): ReactNode {
  const [series, setSeries] = useState('tgki');
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const baseUrl = useBaseUrl('/specs/');

  useEffect(() => {
    const {series: s, version: v} = getParams();
    if (specs[s]) setSeries(s);
    setSelectedVersion(v);
  }, []);

  const spec = specs[series];
  const currentVersion =
    spec.versions.find((v) => v.version === selectedVersion) || spec.versions[0];
  const iframeSrc = currentVersion.external
    ? currentVersion.file
    : `${baseUrl}${currentVersion.file}`;

  function navigate(s: string, v?: string) {
    const params = new URLSearchParams();
    params.set('s', s);
    if (v) params.set('v', v);
    window.history.pushState({}, '', `?${params.toString()}`);
    setSeries(s);
    setSelectedVersion(v || null);
  }

  return (
    <Layout title={`${spec.title} ${currentVersion.version}`}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <span className={styles.specTitle}>{spec.title}</span>
          <div className={styles.controls}>
            <select
              className={styles.select}
              value={series}
              onChange={(e) => navigate(e.target.value)}>
              <option value="tgki">第3世代カーネル（ITRON系）</option>
              <option value="ngki">新世代カーネル</option>
            </select>
            <select
              className={styles.select}
              value={currentVersion.version}
              onChange={(e) => navigate(series, e.target.value)}>
              {spec.versions.map((v, i) => (
                <option key={v.version} value={v.version}>
                  {v.version}
                  {i === 0 ? ' (最新)' : ''} — {v.date}
                </option>
              ))}
            </select>
          </div>
        </div>
        <SearchBar
          key={`${series}-${currentVersion.version}`}
          iframeRef={iframeRef}
          isExternal={!!currentVersion.external}
          externalUrl={currentVersion.file}
        />
      </div>
      <iframe
        ref={iframeRef}
        className={styles.specFrame}
        src={iframeSrc}
        title={`${spec.title} ${currentVersion.version}`}
      />
    </Layout>
  );
}
