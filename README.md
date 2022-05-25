## DSA Subgraph

Query the subgraph: https://thegraph.com/hosted-service/subgraph/richa-iitr/dsa?selected=playground <br>
Pending Version: https://thegraph.com/hosted-service/subgraph/richa-iitr/dsa?version=pending

Queries can be made for: 
- `accountID`: Account ID of the DSA
- `address`: Address of the DSA
- `version`: Version of the DSA
- `auths`: The owners of the DSA
- `owner`: Owner of a DSA (returns a single owner of DSA)

Query Results:

<pre>{ 
  dsas(first: 5) {
    id 
    version 
    address 
    owner 
  }
}</pre>


