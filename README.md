## DSA Subgraph 

Query the subgraph (Matic deployment): https://thegraph.com/hosted-service/subgraph/richa-iitr/dsa?selected=playground <br>
Pending Version: https://thegraph.com/hosted-service/subgraph/richa-iitr/dsa?version=pending

Queries can be made for: 
- `accountID`: Account ID of the DSA
- `address`: Address of the DSA
- `version`: Version of the DSA
- `auths`: The owners of the DSA
- `owner`: Owner of a DSA (returns a single owner of DSA)

**Query Results**:

<pre>{ 
  dsas(where: {accountID: 12) {
    id 
    version 
    accountID
    address 
    auths
    owner 
  }
}</pre>

![Screenshot from 2022-05-25 22-52-53](https://user-images.githubusercontent.com/76250660/170325757-42ff25bc-4705-419e-8203-21f5ed6affda.png)

_Result from InstaList contract:_

![Screenshot from 2022-05-25 22-54-19](https://user-images.githubusercontent.com/76250660/170326002-5cf486d1-1b70-45db-b902-bca626718665.png)



