import React from 'react';
import PropTypes from 'prop-types';
import TablePageSelect from "../../modules/TabePageSelect";
import Pagination from "./Pagination";

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

class PaginationDasboard extends Pagination {

    render() {
        var pager = this.state.pager;

        if(!this.props.items.length) {
            return null;
        }

        return (
            <nav className="row m-3">

                <div className="col-md-8">
                <ul className="pagination pg-blue">
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

                </ul>
                </div>

            </nav>
        );
    }
}

PaginationDasboard.propTypes = propTypes;
PaginationDasboard.defaultProps = defaultProps;
export default PaginationDasboard;