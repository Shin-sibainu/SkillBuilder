export type SkilCardProps = {
  skill: {
    id: string;
    name: string;
    image: string;
    url: string;
    progress?: number; // 進捗パーセンテージ
  };
};
