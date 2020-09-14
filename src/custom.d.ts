type recordType = {
  selectedTag: Tag | null;
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};

type sourceType={
  product:string,
  count:number
}
type StateType = {
  records: recordType[];
  tags: Tag[];
  currentTag?: Tag;
  createInfo: string;
  dateRange: {
    year: number[] | null;
    month: number[] | null;
    day: number[] | null;
  };
  currentDate: {
    year: number;
    month: number;
    day: number;
  };
};

type Tag = {
  id: string;
  name: string;
};
// interface Window {

// }
