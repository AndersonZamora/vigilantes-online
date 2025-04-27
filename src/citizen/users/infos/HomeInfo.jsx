import { useEffect } from 'react'
import { useAdInfo } from '../../../hooks';
import { LayoutContainer } from '../../../layout';
import { CardInfo } from './CardInfo';

export const HomeInfo = () => {

    const { startLoadingInfo, infos } = useAdInfo();

    useEffect(() => {
        startLoadingInfo();
    }, [])

    return (
        <LayoutContainer >
            <div className="row">
                {
                    infos.map(info => (
                        <CardInfo
                            key={info.id}
                            children={info}
                        />
                    ))
                } 
            </div>
        </LayoutContainer>
    )
}
