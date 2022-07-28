import React, {PureComponent} from 'react';

class SuspendedError extends PureComponent {

    render() {
        return (
            <div className={'user-suspended-banner'}>
                <div className={'user-suspended-banner-outer'}>
                    <div className={'user-suspended-content'}>
                        <div className={'user-suspended-text'}>
                        <span>
                            Your account has been suspended. Please contact <a href={'https://myaccount.paddypower.com/summary/accountsummary'}> Customer Service </a>for more information.
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuspendedError;