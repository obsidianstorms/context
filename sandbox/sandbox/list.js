const util = require("util");

// const t = {
//   externals: [
//     {
//       allowlist: ({
//         whitelist: ["webpack/hot/poll?100"]
//       }).whitelist.map((item) => item)
//     }
//   ]
// };

// console.log(util.inspect(t, { depth: 5 }));



// function piat(content, binder) {
//   console.log('x', content);
//   const [[original, data]] = Object.entries(content);
//   console.log('y', data);
//   const fixer = {};
//   fixer[binder] = data;
//   return fixer
// }

// const b = {
//   ...piat(
//     { "whitelist": ["webpack/hot/poll?100"] },
//     "allowlist"
//   )
// }

// console.log(util.inspect(b, { depth: 5 }));

// console.log({x:["b"]});
// console.log(Object.entries({x:"b"}));
// console.log(Object.entries({x:["b"]}));
// console.log({ "whitelist": ["webpack/hot/poll?100"] });
// console.log(Object.entries({ "whitelist": ["webpack/hot/poll?100"] }));








const speechCodes = [
  ["white", "allow"]
];

function piat(content) {
  const [propitiated] = Object.entries(content).map(([key, value]) => {
    const [washedKey] = speechCodes.map(([unclean, approved]) => {
      return key.replace(unclean, approved);
    });
    console.log(washedKey);
    let placated = {};
    placated[washedKey] = value;
    return placated;
  });
  return propitiated;
}



const r = {
  ...piat(
    { "whitelist": ["webpack/hot/poll?100"] }
  )
};
console.log(util.inspect(r, { depth: 5 }));








