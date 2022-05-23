import React,{useState,useEffect} from 'react'
import Card from './Card'
let API_key="&api_key=9eb9a75b0a60688ecc1860f176abf14e";
let base_url="https://api.themoviedb.org/3"
let url=`${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
let arr=["Populer","Theatre","Kids","Drama","Comedie"];
function Main() {
    const [movieData, setData] = useState([]);
    const [url_set, seturl] = useState(url)
    const [search, setSearch] = useState()

    useEffect(() => {
        fetch(url_set).then(res=>res.json()).then(data=>{
                setData(data.results)
        })
    }, [url_set])
    const getData = (movieType) => { 
        if (movieType=="Populer") {
            url=`${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
        }
        if (movieType=="Theatre") {
            url=`${base_url}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22${API_key}`
        }
        if (movieType=="Kids") {
            url=`${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc${API_key}`
        }
        if (movieType=="Drama") {
            url=`${base_url}/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=1${API_key}`
        }
        if (movieType=="Comedie") {
            url=`${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
        }
        seturl(url)
     }
    const searchMovie = (evt) => { 
        if (evt.key=="Enter") {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            seturl(url)
            setSearch("")
        }
     }
  return (
    <>
        <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value)=>{
                                return(
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <li><a href="#" name={value} onClick={(e)=>{
                                        getData(e.target.name)
                                    }}>{value}</a></li>
                                )
                        })
                    }
                </ul>
            </nav>
        <form>
        <div className="search-btn">
                    <input type="text" placeholder='Enter Movie Name' className='inputText'
                     onChange={(e)=>{setSearch(e.target.value)}}
                      value={search}
                      onKeyPress={searchMovie}
                      />
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        </form>
        </div>
        <div className="container">
            {
                movieData.length==0?<p className='notfound'>Not Found</p>:movieData.map((res,pos)=>{
                    return(
                        <Card info={res} key={pos}/>
                    )
                })
            }
        </div>
    </>
  )
}

export default Main