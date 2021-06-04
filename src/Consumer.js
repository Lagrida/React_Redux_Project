import { useEffect } from 'react';
import {connect} from 'react-redux';
import { getPosts } from './store/Posts/PostActions';

function ConsumerComponent({getPosts}){
    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);
    return <></>
}
const Consumer = connect(
    state => ({
        
    }),
    {
        getPosts
    }
  )(ConsumerComponent);
export default Consumer;
