let arr = [1,2,3,4];

let tpl = `
p
  <% for(let i = 0; i < arr.length; i++) {%>
  <%= arr[i] %>
  <% } %>
p
`
// console.log(tpl)

// setTimeout(()=>void console.log(1) ,2000);

let f = (a, ...arr) => {
  console.log(a, arr);
  return [a, arr];
}

// f(1, 2, 3, 4);

// [2,2,2].map((v, i) => void console.log(v, i));

const obj = {
  name: `zhang`
}
let sayName = () => void console.log(this);
// 提案未实现
// obj::sayName();