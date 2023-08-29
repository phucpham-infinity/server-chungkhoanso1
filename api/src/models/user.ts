import { useModelGuts } from '@/helpers';
import { knex } from '@/configs';

const name = 'users';
const tableName = 'eY1HtMJlE_users';

const selectableProps = [
  'ID',
  'user_nicename',
  'user_url',
  'user_email',
  'user_registered',
  'user_activation_key',
  'user_status',
  'display_name',
];

export const USER = useModelGuts({
  knex,
  name,
  tableName,
  selectableProps,
});
