import React from 'react';
import PropTypes from 'prop-types';
import TablePageSelect from "../../modules/TabePageSelect";

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {
                totalItems: 0,
                currentPage: 1,
                pageSize: 10,
                totalPages: 1,
                startPage: 1,
                endPage: 1,
                startIndex: 0,
                endIndex: 0,
                pages: []
            }
        };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            // this.setPage(this.props.initialPage);
            var {items, pageSize, totalPages, totalElements} = this.props;
            // var pager = this.state.pager;
            //
            // if (page < 1 || page > pager.totalPages) {
            //     return;
            // }
            //
            // get new pager object for specified page
            var pager = this.getPager(items.length, this.props.initialPage, pageSize, totalPages, totalElements);
            //
            // get new page of items from items array
            // var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
            // var pageOfItems = items;
            //
            // update state
            this.setState({pager});
        }

    }

    setPage(page) {
        var {items, pageSize, totalPages, totalElements} = this.props;
        // var pager = this.state.pager;

        // if (page < 1 || page > pager.totalPages) {
        //     return;
        // }

        // get new pager object for specified page
        var pager = this.getPager(items.length, page, pageSize, totalPages, totalElements);

        // update state
        this.setState({pager: pager}, this.props.onChangePage(pager));

        // call change page function in parent component

    }

    getPager(totalItems, currentPage, pageSize, totalPages) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        if(!totalPages) {
            totalPages = Math.ceil(totalItems / pageSize);
        }


        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    
    onChangeHandle = (pageSize) => {
        var pager = this.state.pager;
        pager.pageSize = pageSize
        pager.currentPage = 1;
        this.setState({pager});
        this.props.onChangePage(pager);
    };

    getDisplayedAmount = () => {
        var amount = this.props.pageSize * this.props.initialPage;
        var start = amount - this.props.pageSize + 1;
        if(this.props.isLast) {
            amount = (this.props.pageSize * (this.props.initialPage - 1)) + this.props.items.length;
            start = amount - this.props.items.length + 1;
        }

        return  start +"-" + amount;
    };

    render() {
        var pager = this.state.pager;

        if(!this.props.items.length) {
            return null;
        }

        // if (!pager.pages || pager.pages.length <= 1) {
        //     // don't display pager if there is only 1 page
        //     return null;
        // }


        return (
            <nav className="row m-3">

                <div className="col-md-8">
                <ul className="pagination pg-blue">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a className="page-link"  onClick={() => this.setPage(1)}>Pierwszy</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a className="page-link" role="button" onClick={() => this.setPage(pager.currentPage - 1)}>Poprzedni</a>
                    </li>

                    {pager.pages.length ?  pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    ) : ''
                    }

                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1 > pager.totalPages ? pager.currentPage : pager.currentPage + 1)}>Następny</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Ostatni</a>
                    </li>
                </ul>
                </div>
                <div className="col-md-4 float-right">

                    <p className="float-right">
                        Wyświetlono {this.getDisplayedAmount()} z {this.props.totalElements} &nbsp;
                        <TablePageSelect onChange={this.onChangeHandle} items={[
                            10, 25, 50, 100
                        ]}/>
                    </p>
                </div>

            </nav>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;