type recordType = {
  selectTags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};

type StateType = {
  records: recordType[];
  tags: Tag[];
  currentTag?: Tag;
  createInfo: string;
};

type Tag = {
  id: string;
  name: string;
};
// interface Window {

// }
