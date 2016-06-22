import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import { search } from '../actions/searchActions';

// TODO: may be move this func to reducer
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
  return {
    results: prettyResults(state.search.results),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange(value) {
      dispatch(search.request({ query: value }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
