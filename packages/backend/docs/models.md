
## Use Cases ##

* Allow people to create accounts

* Different spellings of the same name should be treated the same
* Like / Dislike names
* Indicate "Traditional Gender" for names
* Apply Tag to names

* Have some way to indicate "New Submissions"
  * Can only submit names if you have created an account



* Allow users to search by:
  * First name
  * Last name
  * Number of likes
  * Number of dislikes

## Models ##


```
// Maybe "GivenName" instead?
interface FirstName {
  spellings: string[]

  genders: Gender[]
}


// Maybe "InheritedName" instead?
interface LastName {
  spellings: string[]
}


// timestamped
interface FullName {
  givenNames: GivenName[];

  // Is a last name actually necessary?
  lastName?: LastName;

  suffixes: Suffix[];
  prefixes: Prefix[];

  taggings: Tagging[];
}


type Suffix = string;
type Prefix = string;


type Tag = string;

// timestamped
interface Tagging {
  tag: Tag;

  taggedBy: UserID;
  target: FullName;
}

// timestamped
interface User {
  id: UserID;
  username: string;
  passwordHash: string;

  taggings: Tagging[];
}
```
