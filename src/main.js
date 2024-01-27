import '~/app/assets/styles/style.scss';

import { Collage } from '~/components/Collage';
import { UserTable } from '~/components/UserTable';
import { Pagination } from '~/components/Pagination';
import { PostsOverview } from '~/components/PostsOverview';

import { Screen } from '~/shared/lib/core';

const collage = new Screen('#collage', [Collage]);
const table = new Screen(
  '#users-table',
  [UserTable, Pagination, PostsOverview],
  'users__container',
);

collage.render();
table.render();
