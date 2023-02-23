import React , {useState , useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCard from './components/NewsCards/NewsCard';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './style';
const alanKey = '053ca578ae98d0cf3e34ffc39c5eed842e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newArticles , setNewArticles] = useState([]);
    const [activeArticle , setActiveArticle] = useState(-1);
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command , articles , number})=>{
                if(command === 'newHeadlines'){
                    setNewArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    }else {
                        alanBtn().playText('Please try that again...');
                      }
                }
            }
        })
    },[]);
    const classes = useStyles();
    return (
        <div>
            <div className= {classes.logoContainer}>
                <img src='https://ak.picdn.net/shutterstock/videos/9335000/thumb/10.jpg'
                    className={classes.alanLogo}
                />
            </div>
            <NewsCard articles = {newArticles} activeArticle = {activeArticle}/>
        </div>
    )
}

export default App
