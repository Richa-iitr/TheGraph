## TheGraph

**Query**: 
`{
  dsas(first: 5) {
    id
    version
    address
    owner
  }
}`

![Screenshot from 2022-05-21 00-04-36](https://user-images.githubusercontent.com/76250660/169591595-6de6db5d-30a6-4ffe-b6ed-2b6ee304aeba.png)
![Screenshot from 2022-05-21 00-04-45](https://user-images.githubusercontent.com/76250660/169591612-9d5884db-2d01-4ece-8ecc-81411130ea2f.png)

**Query**: 
`{
  dsas(where: {owner: "0xc36142c497053c42BDAa14737bf80e71daa984C5"}) {
    id
    version
    address
    owner
  }
}`

**Query**: 
`{{
  dsa(id: "0x54f607e8b7190bcdF7Fb9a030B5E8F48ac0A25c9") {
    id
    version
    address
    owner
  }
}`
