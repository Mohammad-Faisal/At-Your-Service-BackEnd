import { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import { FormSignIn } from '../forms/FormSignIn';
import { FormSignUp } from '../forms/FormSignUp';
import logo from '../common-components/navigation/logo.jpg';
enum PageState {
    SIGN_IN,
    SIGN_UP,
}

export const ModalAuthentication: FC = () => {
    const [pageState, setPageState] = useState<PageState>(PageState.SIGN_IN);
    const [visibility, setVisibility] = useState(false);

    const changeVisibility = () => setVisibility((prev) => !prev);

    return (
        <>
            <Button
                type={'primary'}
                style={{ marginRight: '20px', alignSelf: 'center', backgroundColor: '#429963', border: '#429963', color: 'white' }}
                onClick={changeVisibility}
            >
                {'Sign In'}
            </Button>
            <Modal
                title={pageState === PageState.SIGN_IN ? 'Sign In' : 'Sign Up'}
                closable={true}
                visible={visibility}
                footer={null}
                onCancel={() => setVisibility(false)}
            >
                <div style={{ display: 'grid', marginTop: '10px' }}>
                    <img src={logo} style={{ height: '100px', alignSelf: 'center', justifySelf: 'center' }} />
                    {pageState === PageState.SIGN_IN && <FormSignIn />}
                    {pageState === PageState.SIGN_UP && <FormSignUp />}

                    {pageState === PageState.SIGN_UP ? (
                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'auto auto 1fr', alignItems: 'center' }}>
                            <div> Already have an account? </div>
                            <Button type={'link'} onClick={() => setPageState(PageState.SIGN_IN)}>
                                {'Sign In here'}
                            </Button>
                        </div>
                    ) : (
                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'auto auto 1fr', alignItems: 'center' }}>
                            <div> Don't have an account? </div>
                            <Button type={'link'} onClick={() => setPageState(PageState.SIGN_UP)}>
                                {'Sign Up first'}
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};
