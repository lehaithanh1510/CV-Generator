import { Card } from 'react-bootstrap'
import "./CompanyCard.scss"

export interface ICompanyCardProp {
    key: string;
    src: string;
    companyName: string;
    address: string;
}

const CompanyCard = (props: ICompanyCardProp) => {
    const { src, companyName, address } = props;
    return (
        <div className="top-company-detail" >
            <Card className="mb-2">
                <Card.Img className="img" variant="top" src={src} />
                <Card.Body>
                    <Card.Title>{companyName}</Card.Title>
                </Card.Body>
                <Card.Footer className="company-footer">
                    <small className="address">{address}</small>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default CompanyCard
