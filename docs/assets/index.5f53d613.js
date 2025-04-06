(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const L="/js-http-crud/assets/javascript.8dac5379.svg";class y{constructor({id:t,isActive:n,balance:a,avatar:s,firstName:r,lastName:c,gender:m}){this.id=t,this.isActive=n,this.balance=a,this.avatar=s,this.firstName=r,this.lastName=c,this.gender=m}}const g=e=>{const{avatar:t,balance:n,first_name:a,gender:s,id:r,isActive:c,last_name:m}=e;return new y({avatar:t,balance:n,firstName:a,gender:s,id:r,isActive:c,lastName:m})},f=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(g)},o={currentPage:0,users:[]},N=async()=>{const e=await f(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},b=async()=>{if(o.currentPage===1)return;const e=await f(o.currentPage-1);o.users=e,o.currentPage-=1},P=e=>{let t=!1;o.users=o.users.map(n=>n.id===e.id?(t=!0,e):n),o.users.length<10&&!t&&o.users.push(e)},T=async()=>{const e=await f(o.currentPage);if(e.length===0){await b();return}o.users=e},l={loadNextPage:N,loadPreviousPage:b,onUserChanged:P,reloadPage:T,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},E=`<div class="modal-dialog">
    <form novalidate>
        <span>User</span>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="number" name="balance" placeholder="Balance" />

        <div>
            <input type="checkbox" id="is-active" name="isActive" checked/>
            <label for="is-active">is active?</label>
        </div>

        <button type="submit">
            Save
        </button>

    </form>
</div>`,$=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t)).json();return g(a)};let i,d,p={};const w=async e=>{if(i==null||i.classList.remove("hide-modal"),p={},!e)return;const t=await $(e);S(t)},v=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},S=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,p=e},A=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=E,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",n=>{n.target.className==="modal-container"&&v()}),d.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(d),s={...p};for(const[r,c]of a){if(r==="balance"){s[r]=+c;continue}if(r==="isActive"){s[r]=c==="on";continue}s[r]=c}await t(s),v()}),e.append(i))},U=async e=>{const t=`http://localhost:3001/users/${e}`,a=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:a}),!0};let u;const x=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FistName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;const n=document.createElement("tbody");return e.append(t,n),e},M=e=>{const t=e.target.closest(".select-user");if(!t)return;const n=t.getAttribute("data-id");w(n)},k=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const n=t.getAttribute("data-id");try{await U(n),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),h()}catch(a){console.log(a),alert("No se pudo eliminar")}},h=e=>{const t=l.getUsers();u||(u=x(),e.append(u),u.addEventListener("click",M),u.addEventListener("click",k));let n="";t.forEach(a=>{n+=`
            <tr>
                <td>${a.id}</td>
                <td>${a.balance}</td>
                <td>${a.firstName}</td>
                <td>${a.lastName}</td>
                <td>${a.isActive}</td>
                <td>
                    <a href="#/" class="select-user" data-id="${a.id}">Edit</a>
                    |
                    <a href="#/" class="delete-user" data-id="${a.id}">Delete</a>
                </td>
            </tr>
        `}),u.querySelector("tbody").innerHTML=n};const B=e=>{const t=document.createElement("button");t.innerText=" Next >";const n=document.createElement("button");n.innerText="< Prev ";const a=document.createElement("span");a.id="current-page",a.innerText=l.getCurrentPage(),e.append(n,a,t),t.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),h(e)}),n.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),h(e)})};const j=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{w()})},q=e=>{const{avatar:t,balance:n,firstName:a,gender:s,id:r,isActive:c,lastName:m}=e;return{avatar:t,balance:n,first_name:a,gender:s,id:r,isActive:c,last_name:m}},H=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"First & last name are required";const n=q(t);let a;return t.id?a=await D(n):a=await C(n),g(a)},C=async e=>{const a=await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:a}),a},D=async e=>{const t=`http://localhost:3001/users/${e.id}`,a=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:a}),a},F=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",h(e),B(e),j(e),A(e,async t=>{const n=await H(t);l.onUserChanged(n),h()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${L}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <div class="card">
      
    </div>
    
  </div>
`;const O=document.querySelector(".card");F(O);
