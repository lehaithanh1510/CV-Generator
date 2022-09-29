import { Badge, Card, Row } from 'react-bootstrap'
import { RiCoinsFill } from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./JobCard.scss"

export interface IJobCardProp {
    src: string,
    title: string,
    salary: string,
    tags: string[],
    status: string,
    address: string,
}

const renderTags = (tags: string[]) => {
    return tags.map((tag, id) => {
        return <Badge key={id} style={{ marginRight: "5%", backgroundColor: "red" }} pill >{tag}</Badge>
    })
}

const renderStatus = (status: string) => {
    const a = new Date();
    const b = new Date();

    var timeFooter = "minutes"

    let diffTime = 0;
    //Math.floor(Math.abs(a - b) / (1000 * 60));
    if (diffTime > 60) {
        diffTime = Math.floor(diffTime / 60)
        timeFooter = "hours"
        if (diffTime > 24) {
            diffTime = Math.floor(diffTime / 24)
            timeFooter = "day"
        }
    }


    return (`${diffTime} ${timeFooter} ago`)
}



const JobCard = (props: IJobCardProp) => {
    const { src, title, salary, tags, status, address } = props;
    return (

        <div className="top-job-detail" >
            <Card className="mb-2">
                <Card.Img className="job-logo" variant="top" src={src} />

                <Card.Body>
                    <Card.Title style={{ textAlign: "left" }}>{title}</Card.Title>
                    <Card.Text className="job-middle">
                        <div style={{ color: "green" }}><RiCoinsFill></RiCoinsFill> {salary}</div>
                        <div style={{ color: "orange" }}> {address}</div>
                    </Card.Text>
                    <Card.Text className="job-bottom">
                        <div className="tag-list" style={{ width: '70%' }}>
                            {renderTags(tags)}
                        </div>
                        <div className="status" > {renderStatus(status)} </div>
                    </Card.Text>
                </Card.Body>
                {/* <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer> */}
            </Card>
        </div>
    )
}

export default JobCard
