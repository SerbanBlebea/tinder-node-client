import React from 'react';
import axios from 'axios';
import config from './../../config.js';
import { GirlCards, PageTitle, Pagination } from './../../components/components';

class GirlsPage extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            girls: [],
            limit: null,
            page: null,
            pages: null,
            total: null,
        };
    }

    componentDidMount()
    {
        this.props.history.listen((location, action) => {
            this.getGirls(location.search.split('=')[1])
        })
        this.getGirls(1)
    }

    getGirls(page)
    {
        axios.get(config.api + '/girls?page=' + page).then((result)=> {
            console.log(result.data)
            this.setState({
                girls: result.data.docs,
                limit: result.data.limit,
                current: result.data.page,
                pages: result.data.pages,
                total: result.data.total
            })
        }).catch((error)=> {
            console.log(error)
        })
    }

    render()
    {
        return (
            <div>
                <PageTitle>Girls page</PageTitle>
                <div className="">
                    <Pagination limit={ this.state.limit }
                                current={ this.state.current }
                                pages={ this.state.pages }
                                total={ this.state.total } />
                </div>
                <GirlCards girls={ this.state.girls } />
                <div className="row justify-content-center mt-5">
                    <Pagination limit={ this.state.limit }
                                current={ this.state.current }
                                pages={ this.state.pages }
                                total={ this.state.total } />
                </div>
            </div>
        )
    }
}

export default GirlsPage;