import { Knex } from 'knex';

interface IGuts {
  knex: Knex;
  name: string;
  tableName: string;
  selectableProps?: any;
  timeout?: number;
}
interface IFindAll {
  limit?: number;
  offset?: number;
  where?: Knex.Where | {}
}
export const useModelGuts = ({ knex, name = 'name', tableName = 'table-name', selectableProps = [], timeout = 1000 }: IGuts) => {
  const create = async (props: any) => {
    try {
      delete props.id;
      // not allowed to set `id`
      return [await knex.insert(props).returning(selectableProps).into(tableName).timeout(timeout), null];
    } catch (error) {
      return [null, error];
    }
  };

  const findAll = async (props?: IFindAll): Promise<[any, any]> => {
    try {
      if(props.where) return [
          await knex
            .select(selectableProps)
            .from(tableName)
            .timeout(timeout)
            .where(props.where)
            .offset(props?.offset || 0)
            .limit(props?.limit || 10),
          null,
        ];
      
      return [
        await knex
          .select(selectableProps)
          .from(tableName)
          .timeout(timeout)
          .offset(props?.offset || 0)
          .limit(props?.limit || 10),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  };

  const count = async (props: any): Promise<[any, any]> => {
    try {
      return [await knex.from(tableName).count(props).timeout(timeout), null];
    } catch (error) {
      return [null, error];
    }
  };

  const find = async (filters: Knex.Where): Promise<[any, any]> => {
    try {
      return [await knex.select(selectableProps).from(tableName).where(filters).timeout(timeout), null];
    } catch (error) {
      return [null, error];
    }
  };

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = async (filters: Knex.Where): Promise<[any, any]> =>
    find(filters).then(results => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = async (id: string | number): Promise<[any, any]> => {
    try {
      return [await knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout), null];
    } catch (error) {
      return [null, error];
    }
  };

  const update = async (id: string | number, props: any): Promise<[any, any]> => {
    delete props.id; // not allowed to set `id`

    try {
      return [await knex.update(props).from(tableName).where({ id }).returning(selectableProps).timeout(timeout), null];
    } catch (error) {
      return [null, error];
    }
  };

  const destroy = id => knex.del().from(tableName).where({ id }).timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    knex,
    count,
  };
};
