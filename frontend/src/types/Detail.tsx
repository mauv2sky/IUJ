// export type DetailType = {
//   place: {
//     id: number;
//     name: string;
//     type: string;
//     latlng: number[];
//     address: string[];
//     deal: {
//       area: number[];
//       floor: number;
//       contract_ym: number;
//       deal_type: string;
//       guarantee: number;
//       price: number;
//       monthly: number;
//     }[];
//   };
//   total_score: number;
//   map: {
//     [infra: string]: {}[];
//   };
//   facility: {
//     [infra: string]: { [key: string]: string | number[] | number }[];
//   };
// };

export type Detail어린이집Type = {
  facility: {
    [infra: string]: { [key: string]: string | number[] | number }[];
  };
};
