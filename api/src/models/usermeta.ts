import { useModelGuts } from '@/helpers';
import { knex } from '@/configs';

const name = 'usermeta';
const tableName = 'eY1HtMJlE_usermeta';

const selectableProps = '*';

export const USERMETA = useModelGuts({
  knex,
  name,
  tableName,
  selectableProps,
});
