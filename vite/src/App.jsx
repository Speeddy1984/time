import {useState} from 'react';
import moment from 'moment';

function DateTime(props) {
  return (
      <p className="date">{props.date}</p>
  );
}

function DateTimePretty(Component) {
  return function(props) {
      const now = moment();
      console.log(now);
      const date = moment(props.date);
      let diff = now.diff(date, 'minutes');
      let formattedDate;

      if (diff < 60) {
          formattedDate = `${diff} минут назад`;
      } else {
          diff = now.diff(date, 'hours');
          if (diff < 24) {
              formattedDate = `${diff} часов назад`;
          } else {
              diff = now.diff(date, 'days');
              formattedDate = `${diff} дней назад`;
          }
      }

      return <Component {...props} date={formattedDate} />;
  }
}

const DateTimeWithPretty = DateTimePretty(DateTime);

function Video(props) {
    console.log(props);
  return (
      <div className="video">
          <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          <DateTimeWithPretty date={props.date} />
      </div>
  );
}

function VideoList(props) {
  return props.list.map((item, index) => <Video key={index} url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
      {
          url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2024-06-28 23:34:00'
      },
      {
          url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2024-06-28 21:24:00'
      },
      {
          url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-02-03 23:16:00'
      },
      {
          url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-01-03 12:10:00'
      },
      {
          url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-01-01 16:17:00'
      },
      {
          url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2017-12-02 05:24:00'
      },
  ]);

  return (
      <VideoList list={list} />
  );
}