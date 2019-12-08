import Knex from "knex";

import { GivenName, Surname, FullName } from '../types';

export interface GivenNameSpellingRow {
  given_name_id: number;
  spelling: string;
}





function WhereID(query: Knex.QueryBuilder, columnName: string, value?: number | number[]) {
  if(typeof(value) === 'number') {
    query.where(columnName, value);
  } else if(Array.isArray(value)) {
    query.whereIn(columnName, value);
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


  interface SurnameSpellingRow {
    surname_id: number;
    spelling: string;
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
      const query = knex('full_names_given_names');
      WhereID(query, 'full_name_id', id);

      return query;
    }

    static createSurnamesQuery({id}: {id?: number | number[]} = {}) {
      const query = knex('full_names_surnames');
      WhereID(query, 'full_name_id', id);

      return query;
    }


    static async fetchAll() {

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
