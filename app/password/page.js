export default function password() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>تسجيل الدخول</h2>

      <input
        type="text"
        placeholder="اسم المستخدم"
        style={styles.input}
      />

      <input
        type="password"
        placeholder="كلمة المرور"
        style={styles.input}
      />

      <button style={styles.button}>دخول</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '100px auto',
    padding: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  title: {
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 20,
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 16,
    direction: 'rtl',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
  },
};
