export default interface Card {
  id: string;
  evaluation?: number;
  front: {
    template: string;
    data: Record<string, string>;
    render?: string;
  };
  back: {
    template: string;
    data: Record<string, string>;
    render?: string;
  };
}
