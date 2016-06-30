import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import { search, resetSearch } from '../actions/searchActions';

function prettyResults(results) {
  return results.reduce((acc, result) => {
    const isTypeInAcc = acc.filter(group => group.type === result.type).length === 1;
    const resultItem = {
      title: result.content,
      link: result.link,
    };

    if (!isTypeInAcc) {
      return [...acc, {
        type: result.type,
        items: [resultItem],
      }];
    }

    return acc.map(group => {
      if (group.type === result.type) {
        return {
          ...group,
          items: [...group.items, resultItem],
        };
      }
      return group;
    });
  }, []);
}

function mapStateToProps(state) {
  const { results } = state.search;
  return {
    results: results ? prettyResults(results) : results,
    isWaiting: state.search.isFetching,
    query: state.search.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(query) {
      if (!query) {
        return dispatch(resetSearch());
      }
      dispatch(search.request({ query }));
    },
    onItemClick() {
      dispatch(resetSearch());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
