export type CategoryValue = { id: string, value: string }

export default interface Category {
  id: string,
  name: string;
  values: CategoryValue[];
}
