import './Connected.css'; // Make sure to create this CSS file

const Connected = (props) => {
  return (
    <div className='connected-container'>
      <h1 className='connected-header'>You are connected to Metamask</h1>
      <p className='connected-account'>Metamask Account: {props.account}</p>
      <p className='connected-account'>Remaining Time: {props.remainingTime}</p>
      {props.showVoteButton ? (
        <p className='connected-account'>You have already voted</p>
      ) : (
        <div>
          <input
            type='number'
            placeholder='Enter Candidate Index'
            value={props.number}
            onChange={props.handleNumberChange}
            min={0}
            max={props.candidates.length - 1}
          />
          <br />
          <button
            className='login-button'
            onClick={props.voteFunction}
            disabled={props.isLoading}
          >
            {props.isLoading ? <div className='spinner'></div> : 'Vote'}
          </button>
        </div>
      )}
      <table id='myTable' className='candidates-table'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate name</th>
            <th>Candidate votes</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Connected;
