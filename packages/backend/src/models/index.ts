import Knex from "knex";

import _ from 'lodash';

import { GivenName, Surname, FullName } from '@memorable.name/types';

export interface GivenNameSpellingRow {
  given_name_id: number;
  spelling: string;
}


interface SurnameSpellingRow {
  surname_id: number;
  spelling: string;
}


interface FullNameGivenNameRow {
  full_name_id: number;
  given_name_id: number;
  ordering: number;
}

interface FullNameSurnameRow {
  full_name_id: number;
  surname_id: number;
  ordering: number;
}




function WhereID<T>(query: Knex.QueryBuilder, columnName: string, value?: T | T[]) {
  const t = typeof(value);
  if(t !== 'undefined') {
    if(Array.isArray(value)) {
      query.whereIn(columnName, value);
    } else {
      query.where(columnName, value);
    }
  }
}




export function createModels(knex: Knex) {

  class GivenNameKnex implements GivenName {
    id: number;
    spellings: string[];
    genders: string[];

    constructor({id, spellings, genders}: GivenName) {
      this.id = id;
      this.spellings = spellings;
      this.genders = genders;
    }

    static async create({spellings}: {spellings: string[]}) {
      return knex.transaction(async function(trx) {
        const [id] = await trx("given_names").insert({}, 'id');

        const uniqueSpellings = Array
          .from(new Set(spellings))
          .filter((s)=> s);

        const spellingsRows = uniqueSpellings
          .map((s)=> ({
            spelling: s,
            given_name_id: id,
          }));

        await trx("given_names_spellings").insert(spellingsRows);

        return {
          id: id,
          spellings: uniqueSpellings,
        }
      });
    }

    static createSpellingsQuery({id}: {id?: number | number[]} = {}) {
      const spellingsQuery = knex("given_names_spellings").select();
      WhereID(spellingsQuery, 'given_name_id', id);

      return spellingsQuery;
    }

    static async fetchAll({id}: {id?: number | number[]} = {}) {
      const rows = await this.createSpellingsQuery({id});
      return this.reassemble(rows);
    }

    // Takes a bunch of `given_names_spellings` rows and reassembles them
    // into a collection of `GivenName` instances.
    static reassemble(rows: GivenNameSpellingRow[]): GivenNameKnex[] {
      const givenNameGroupings: Record<number, GivenNameKnex> = Object.create(null);

      for(const r of rows) {
        const id = r.given_name_id;
        const givenName = givenNameGroupings[id] || (givenNameGroupings[id] = new GivenNameKnex({
          id: id,
          spellings: [],
          genders: [],
        }));

        givenName.spellings.push(r.spelling);
      }

      // TODO: Populate gender fields

      return Object.values(givenNameGroupings);
    }

  }




  class SurnameKnex implements Surname {
    id: number;
    spellings: string[];

    constructor({id, spellings}: Surname) {
      this.id = id;
      this.spellings = spellings;
    }


    static createSpellingsQuery({id}: {id?: number | number[]} = {}) {
      const spellingsQuery = knex("surnames_spellings").select();
      WhereID(spellingsQuery, 'surname_id', id);

      return spellingsQuery;
    }

    static async fetchAll({id}: {id?: number | number[]} = {}) {
      const spellingsQuery = this.createSpellingsQuery();
      const spellingRows = await spellingsQuery;
      return this.reassemble({spellingRows});
    }

    static reassemble({spellingRows}: {spellingRows: SurnameSpellingRow[]}): SurnameKnex[] {
      const surnameGroupings: Record<number, SurnameKnex> = Object.create(null);

      for(const r of spellingRows) {
        const id = r.surname_id;
        const surname = surnameGroupings[id] || (surnameGroupings[id] = new SurnameKnex({
          id: id,
          spellings: [],
        }));

        surname.spellings.push(r.spelling);
      }

      return Object.values(surnameGroupings);
    }
  }




  class FullNameKnex implements FullName {
    id: number;

    givenNames: GivenName[];
    surnames: Surname[];

    constructor({id, givenNames, surnames}: FullName) {
      this.id = id;
      this.givenNames = givenNames;
      this.surnames = surnames;
    }


    get genders() {
      const genders = new Set<string>();
      for(const givenName of this.givenNames) {
        for(const g of givenName.genders) {
          genders.add(g);
        }
      }

      return Array.from(genders);
    }




    static createGivenNamesQuery({id}: {id?: number | number[]} = {}) {
      const query = knex<FullNameGivenNameRow>('full_names_given_names');
      WhereID(query, 'full_name_id', id);

      return query;
    }

    static createSurnamesQuery({id}: {id?: number | number[]} = {}) {
      const query = knex<FullNameSurnameRow>('full_names_surnames');
      WhereID(query, 'full_name_id', id);

      return query;
    }


    static async fetchAll({id}: {id?: number | number[]} = {}) {
      const givenNamesQuery = this.createGivenNamesQuery({id});
      const surnamesQuery = this.createSurnamesQuery({id});

      const [
        givenNameRows, surnameRows,
      ] = await Promise.all([givenNamesQuery, surnamesQuery]);

      const [
        givenNames, surnames,
      ] = await Promise.all([
        GivenNameKnex.fetchAll({
          id: givenNameRows.map((gnr)=> gnr.given_name_id)
        }),
        SurnameKnex.fetchAll({
          id: surnameRows.map((sr)=> sr.surname_id),
        }),
      ]);


      const givenNameLookup = _.groupBy(givenNames, (gn)=> gn.id);
      const surnameLookup = _.groupBy(surnames, (s)=> s.id);

      const fullnameLookup: Record<number, FullNameKnex> = {};

      for(const row of givenNameRows) {
        const fullName = fullnameLookup[row.full_name_id] || (fullnameLookup[row.full_name_id] = new FullNameKnex({
          id: row.full_name_id,
          givenNames: [],
          surnames: [],
          genders: [], // FIXME
        }));

        fullName.givenNames.push(givenNameLookup[row.given_name_id][0]);
      }

      for(const row of surnameRows) {
        const fullName = fullnameLookup[row.full_name_id] || (fullnameLookup[row.full_name_id] = new FullNameKnex({
          id: row.full_name_id,
          givenNames: [],
          surnames: [],
          genders: [], // FIXME
        }));

        fullName.surnames.push(surnameLookup[row.surname_id][0]);
      }

      return Object.values(fullnameLookup);
    }

    static reassemble() {

    }

  }



  return {
    GivenName: GivenNameKnex,
    Surname: SurnameKnex,
    FullName: FullNameKnex,
  };
}
