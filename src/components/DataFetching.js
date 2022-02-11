import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Table from './Table';

function DataFetching() {
    const [data, newData] = useState(null);
  
    useEffect(() => {
      fetch('./getList.php')
        .then((response) => response.text())
        .then((response) => newData(response));
    }, []);
  
    return <div>{data ? data : 'No data yet...'}</div>;
  }
/*function DataFetching(){
    const [posts, setPosts] = useState([])

    var heading = ['Name'];
    var body =
    [['Kapil', 'Jaipur', 'MCA'],
    ['Aakash', 'Hisar', 'Btech'],
    ['Mani', 'Ranchi', 'MSc'],
    ['Yasfh', 'Udaipur', 'Mtech']
    ];
    useEffect(() =>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res =>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [])

    return(
        <div>
            {posts.map(post => post.title)}
        </div>
    )
}*/

export default DataFetching