type recordType = {
  selectTags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

type Tag = {
  id: string;
  name: string;
};

interface Window {
  tags: Tag[];
  createTag: (name: string) => void;
  updateTag: (id: string, name: string) => string;
  removeTag: (id: string) => boolean;
  findTag: (id: string) => Tag;
}
