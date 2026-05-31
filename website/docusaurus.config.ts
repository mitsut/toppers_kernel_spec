import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TOPPERS カーネル統合仕様書',
  tagline: 'TOPPERS カーネル統合仕様書のリッチテキスト表示',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://mitsut.github.io',
  baseUrl: '/toppers_kernel_spec/',

  organizationName: 'mitsut',
  projectName: 'toppers_kernel_spec',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'ignore',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'TOPPERS カーネル統合仕様書',
      items: [
        {
          type: 'dropdown',
          label: '第3世代カーネル',
          position: 'left',
          items: [
            {label: 'Release 3.7.0 (最新)', to: '/spec?s=tgki'},
            {label: 'Release 3.6.0', to: '/spec?s=tgki&v=3.6.0'},
            {label: 'Release 3.5.0', to: '/spec?s=tgki&v=3.5.0'},
            {label: 'Release 3.4.2', to: '/spec?s=tgki&v=3.4.2'},
            {label: 'Release 3.4.1', to: '/spec?s=tgki&v=3.4.1'},
            {label: 'Release 3.4.0', to: '/spec?s=tgki&v=3.4.0'},
            {label: 'Release 3.3.0', to: '/spec?s=tgki&v=3.3.0'},
            {label: 'Release 3.2.1', to: '/spec?s=tgki&v=3.2.1'},
          ],
        },
        {
          type: 'dropdown',
          label: '新世代カーネル',
          position: 'left',
          items: [
            {label: 'Release 1.7.1 (最新)', to: '/spec?s=ngki'},
          ],
        },
        {
          href: 'https://www.toppers.jp/',
          label: 'TOPPERS Project',
          position: 'right',
        },
        {
          href: 'https://github.com/mitsut/toppers_kernel_spec',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '仕様書',
          items: [
            {
              label: '第3世代カーネル（ITRON系）',
              to: '/spec?s=tgki',
            },
            {
              label: '新世代カーネル',
              to: '/spec?s=ngki',
            },
          ],
        },
        {
          title: 'リンク',
          items: [
            {
              label: 'TOPPERS Project',
              href: 'https://www.toppers.jp/',
            },
            {
              label: '公式ドキュメント',
              href: 'https://www.toppers.jp/documents.html',
            },
          ],
        },
        {
          title: 'その他',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mitsut/toppers_kernel_spec',
            },
            {
              label: 'Issues',
              href: 'https://github.com/mitsut/toppers_kernel_spec/issues',
            },
          ],
        },
      ],
      copyright: `TOPPERS License. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
