import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { type PlopTypes } from '@turbo/gen';

/** `path`はワークスペースルート（`apps/web`）からの相対パス */
const searchDirs = (path: string, recursive = false) => {
  const absolutePath = resolve(__dirname, '../..', path);

  // withFileTypesを使うとネストしたパスを取得できない（components/uiではなくuiになる）ので使わない
  return (readdirSync(absolutePath, { recursive }) as string[]).filter((v) =>
    statSync(resolve(absolutePath, v)).isDirectory(),
  );
};

export default function generator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator('web', {
    description: 'webにコンポーネントを作成する',
    prompts: [
      {
        type: 'list',
        name: 'whichComponents',
        message: 'コンポーネントを作成する場所を選択して下さい',
        choices: [
          'components',
          ...searchDirs('src/features').map((dir) => `features/${dir}/components`),
        ],
      },
      {
        type: 'list',
        name: 'directory',
        message: 'コンポーネントを作成するディレクトリを選択して下さい',
        choices: (answers) => [
          { name: 'components', value: '' },
          ...searchDirs(`src/${answers.whichComponents as string}`, true).map((dir) => ({
            name: `components/${dir}`,
            value: dir,
          })),
        ],
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'コンポーネントの名前を入力して下さい（eg. Button）',
      },
    ],
    actions: (answers) => {
      const generateDirectory = `${join(
        'src',
        answers?.whichComponents as string,
        answers?.directory as string,
      )}/{{kebabCase componentName}}`;

      return [
        {
          type: 'add',
          path: `${generateDirectory}/index.ts`,
          templateFile: 'templates/index.ts.hbs',
        },
        {
          type: 'add',
          path: `${generateDirectory}/{{kebabCase componentName}}.tsx`,
          templateFile: 'templates/component.tsx.hbs',
        },
        {
          type: 'add',
          path: `${generateDirectory}/{{kebabCase componentName}}.stories.tsx`,
          templateFile: 'templates/component.stories.tsx.hbs',
        },
      ];
    },
  });
}
