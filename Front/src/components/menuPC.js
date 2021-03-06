/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/25
 * Description:
 */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import config from '../../config';
import actionTypes from '../actions';
import * as themeReducer from '../reducers/theme';

import '../theme/css/menu-pc.less';


export default class MenuPC extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        theme: PropTypes.object,
        headInfo: PropTypes.object
    };

    static defaultProps = {
        theme: themeReducer.defaultState
    };

    constructor(props) {
        super(props);
        this.state = {
            linksOpened: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !this.props.theme.get('current').equals(nextProps.theme.get('current')) ||
            !this.props.headInfo.equals(nextProps.headInfo) ||
            this.state.linksOpened !== nextState.linksOpened
        );
    }

    changeTheme(theme: string) {
        const {dispatch} = this.props;
        if (theme !== this.props.theme.getIn(['current', 'name'])) {
            dispatch({type: actionTypes.change.theme.current, theme});
        }
    }

    render() {
        return (
            <div
                id="menu"
                className="duration-main"
                style={{backgroundColor: this.props.theme.getIn(['current', 'color'])}}
            >
                <Link
                    to="/article/Create-MyResume"
                    className="name"
                >
                    dtysky
                </Link>
                <address className="icons">
                    <a
                        href={this.props.headInfo.get('rss')}
                        className="icon-font icon rss"
                        target="_blank"
                    />
                    <a
                        href="https://github.com/dtysky"
                        className="icon-font icon github"
                        target="_blank"
                    />
                    <a
                        href="https://cn.linkedin.com/pub/tianyu-dai/a8/818/44a"
                        className="icon-font icon linkedin"
                        target="_blank"
                    />
                    <a
                        href="http://psnprofiles.com/dtysky"
                        className="icon-font icon playstation"
                        target="_blank"
                    />
                </address>
                <div className="hr1"></div>
                <nav>
                    <div>
                        <Link
                            to="/"
                            className="home"
                            onMouseEnter={() => this.changeTheme('home')}
                        >
                            Home
                        </Link>
                    </div>
                    <nav className="tag-ath">
                        <Link
                            to="/tags"
                            className="tags"
                            onMouseEnter={() => this.changeTheme('tags')}
                        >
                            Tags
                        </Link>
                        <Link
                            to="/authors"
                            className="authors"
                            onMouseEnter={() => this.changeTheme('authors')}
                        >
                            Authors
                        </Link>
                    </nav>
                </nav>
                <div className="hr2"></div>
                <p className="links-p">Links</p>
                <address className="links">
                    <a
                        className="proj"
                        href="http://proj.dtysky.moe"
                        target="_blank"
                    >
                        Projects
                    </a>
                    <a
                        className="friend"
                        onClick={() => this.setState({linksOpened: !this.state.linksOpened})}
                    >
                        Friends
                    </a>
                </address>
                <div className="hr3"></div>
                <p className="end">这是一个孤独行者的轨迹。</p>
                <div
                    id="menu-links"
                    className="duration-main"
                    style={{
                        top: this.state.linksOpened ? 0 : -400,
                        backgroundColor: this.props.theme.getIn(['current', 'color'])
                    }}
                >
                    <address>
                        {
                            config.links.map((link, index) =>
                                <li key={index}>
                                    <a
                                        target="_blank"
                                        href={link.url}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            )
                        }
                        <li>
                            <a onClick={() => this.setState({linksOpened: false})}>
                                Hide Links
                            </a>
                        </li>
                    </address>
                </div>
            </div>
        );
    }
}
