export default function Account() {
  return (
    <div style={styles.container}>
      <h1>تواصل معنا في حال لديك أي استفسار</h1>

      <ul style={styles.list}>
        <li style={styles.item}>
          <strong>الاسم:</strong> محمد<br />
          <strong>الرقم:</strong> 054647373
        </li>
        <li style={styles.item}>
          <strong>الاسم:</strong> أحمد<br />
          <strong>الرقم:</strong> 0501234567
        </li>
       
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    textAlign: 'right',
  },
};
