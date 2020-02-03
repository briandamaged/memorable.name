
export type Spelling = string;
export type Gender = string;
export type Tag = string;

export interface IsGendered {
  genders: Gender[];
}

export interface NameEquivalence {
  spellings: Spelling[];
}

export interface GivenName extends NameEquivalence, IsGendered {
  id: number;
}

export interface Surname extends NameEquivalence {
  id: number;
}


export interface FullName extends IsGendered {
  id: number;

  givenNames: GivenName[];
  surnames: Surname[];
}


export interface User {
  username: string;
}


//// TODO: Figure out how tagging will work

// export interface Taggable {
//   taggings: Tagging
// }

// export interface Tagging {
//   tag: Tag;
//   appliedTo: Taggable;
//   taggedBy: User;
// }






export class GivenNameRendition {
  spelling: string;
  gender: string;

  constructor({spelling, gender}: {spelling: string, gender: string}) {
    this.spelling = spelling;
    this.gender = gender;
  }
}

export class SurnameRendition {
  spelling: string;

  constructor({spelling}: {spelling: string}) {
    this.spelling = spelling;
  }
}

export class FullNameRendition {
  givenNameRenditions: GivenNameRendition[];
  surnameRenditions: SurnameRendition[];

  constructor({givenNameRenditions, surnameRenditions}: {givenNameRenditions: GivenNameRendition[], surnameRenditions: SurnameRendition[]}) {
    this.givenNameRenditions = givenNameRenditions;
    this.surnameRenditions = surnameRenditions;
  }

  render(): string {
    const comps: string[] = [];
    if(this.givenNameRenditions.length > 0) {
      comps.push(this.givenNameRenditions.map((gr)=> gr.spelling).join(' '));
    }

    if(this.surnameRenditions.length > 0) {
      comps.push(this.surnameRenditions.map((sr)=> sr.spelling).join('-'));
    }
    return comps.join(' ');
  }
}


