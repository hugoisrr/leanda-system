import UnipiEvok from 'unipi-evok';

const IPAddress = process.env.UNIPI_ADDRESS;

const unipi = new UnipiEvok({
  host: IPAddress,
  restPort: 80,
  wsPort: 8080
});

const connectUniPi = async () => {
  try {
    await unipi.on('connected', () => {
      console.log(
        '\x1b[46m%s\x1b[0m',
        `UniPi Connected with address: ${IPAddress}`
      );
    });

    await unipi.on('error', err => {
      console.error('Error:', err);
    });

    await unipi.connect();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectUniPi;
