import React from 'react';
import {connect} from 'react-redux';
import Define from './define';
import Group from './group';
import {expandItem, setDefine, setExports} from '../actions';

const Builder = React.createClass({

  propTypes: {
    build: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    expand: React.PropTypes.object.isRequired,
    info: React.PropTypes.object.isRequired
  },

  onExport: function(values) {
    this.props.dispatch(setExports(values));
  },

  onToggleExpand: function(name, expanded) {
    this.props.dispatch(expandItem(name, expanded));
  },

  onDefine: function(name, value) {
    this.props.dispatch(setDefine(name, value));
  },

  renderGroups: function(groups) {
    if (!groups) {
      return null;
    }
    return groups.map(group => (
      <Group
          expand={this.props.expand}
          key={group.name}
          onExport={this.onExport}
          onToggleExpand={this.onToggleExpand}
          symbols={this.props.build.symbols}
          {...group}/>
    ));
  },

  renderDefines: function(defines) {
    if (!defines) {
      return null;
    }
    return (
      <section>
        <h4>Flags</h4>
        {defines.map(define => {
          let value = define.default;
          if (define.name in this.props.build.defines) {
            value = this.props.build.defines[define.name];
          }
          return (
            <Define
                key={define.name}
                onDefine={this.onDefine}
                symbol={define}
                value={value}/>
          );
        })}
      </section>
    );
  },

  render: function() {
    return (
      <div>
        <h3>Choose what to include in your build</h3>
        {this.renderGroups(this.props.info.groups)}
        {this.renderDefines(this.props.info.defines)}
      </div>
    );
  }

});

export default connect(state => state)(Builder);