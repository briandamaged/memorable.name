import Knex from "knex";

import { GivenName, Surname, FullName } from '../types';

export interface GivenNameSpellingRow {
  given_name_id: number;
  spelling: string;
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
      if(typeof(id) === 'number') {
        spellingsQuery.where('given_name_id', id);
      } else if(Array.isArray(id)) {
        spellingsQuery.whereIn('given_name_id', id);
      }

      return spellingsQuery;
    }

    static async fetchAll({id}: {id?: number | number[]} = {}) {
      const rows = await this.createSpellingsQuery({id});
      return this.reassemble(rows);
    }

    // Takes a bunch of `given_names_spellings` rows and reassembles them
    // into a collection of `GivenName` instances.
    static reassemble(rows: GivenNameSpellingRow[]) {
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

  }

  return {
    GivenName: GivenNameKnex,
    Surname: SurnameKnex,
    FullName: FullNameKnex,
  };
}
