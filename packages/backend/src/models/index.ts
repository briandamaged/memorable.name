

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

}

export interface Surname extends NameEquivalence {
  
}


export interface FullName extends IsGendered {
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
