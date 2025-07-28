'use client'

import { useState, useEffect } from 'react';

const lessons = [
  {
    id: 1,
    title: 'مقدمة في JavaScript',
    description: 'استخدم console.log لطباعة الرسائل.',
    defaultCode: 'console.log("مرحبا بالعالم!");',
    challenge: 'اطبع النص: Hello, Dawod!',
    quiz: {
      question: 'ما وظيفة console.log؟',
      options: ['قراءة ملف', 'كتابة على الشاشة', 'تنفيذ كود', 'حذف متغير'],
      answer: 'كتابة على الشاشة',
    },
  },
  {
    id: 2,
    title: 'المتغيرات',
    description: 'تعلم استخدام let و const.',
    defaultCode: 'let name = "Dawod";\nconsole.log(name);',
    challenge: 'أنشئ متغير باسم age واطبع قيمته.',
    quiz: {
      question: 'ما الكلمة المفتاحية التي تُستخدم لإنشاء متغير قابل للتغيير؟',
      options: ['const', 'var', 'final', 'let'],
      answer: 'let',
    },
  },
  {
    id: 3,
    title: 'الجمل الشرطية',
    description: 'استخدم if للتحقق من الشروط.',
    defaultCode: 'let x = 5;\nif (x > 3) {\n  console.log("x أكبر من 3");\n}',
    challenge: 'تحقق إذا كان الرقم 10 أكبر من 5 واطبع رسالة.',
    quiz: {
      question: 'أي عبارة شرطية صحيحة للتحقق من أن x أكبر من 5؟',
      options: ['if x > 5', 'if (x > 5)', 'if x > 5 then', 'if: x > 5'],
      answer: 'if (x > 5)',
    },
  },
  {
    id: 4,
    title: 'الحلقات (Loops)',
    description: 'استخدم for لتنفيذ كود عدة مرات.',
    defaultCode: 'for (let i = 0; i < 5; i++) {\n  console.log("العدد: " + i);\n}',
    challenge: 'اكتب حلقة تطبع الأعداد من 1 إلى 3.',
    quiz: {
      question: 'ما الكلمة المستخدمة لإنشاء حلقة؟',
      options: ['loop', 'while', 'repeat', 'for'],
      answer: 'for',
    },
  },
  {
    id: 5,
    title: 'الدوال (Functions)',
    description: 'الدوال تساعدك على تنظيم الكود وإعادة استخدامه.',
    defaultCode: 'function sayHello(name) {\n  console.log("مرحبا " + name);\n}\n\nsayHello("Dawod");',
    challenge: 'أنشئ دالة تطبع "مرحباً بالجميع" عند استدعائها.',
    quiz: {
      question: 'ما الكلمة المفتاحية لتعريف دالة؟',
      options: ['define', 'func', 'function', 'method'],
      answer: 'function',
    },
  },
  {
    id: 6,
    title: 'المصفوفات (Arrays)',
    description: 'المصفوفة هي مجموعة من القيم تُخزن داخل متغير واحد.',
    defaultCode: 'let colors = ["أحمر", "أخضر", "أزرق"];\nconsole.log(colors[0]);',
    challenge: 'أنشئ مصفوفة تحتوي على 3 أرقام واطبع العنصر الثاني.',
    quiz: {
      question: 'كيف يمكن الوصول إلى أول عنصر في المصفوفة؟',
      options: ['array.1', 'array[1]', 'array[0]', 'array(first)'],
      answer: 'array[0]',
    },
  },
];

export default function CodingLesson() {
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const [lesson, setLesson] = useState(lessons[0]);
  const [code, setCode] = useState(lessons[0].defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [quizResult, setQuizResult] = useState('');

  useEffect(() => {
    const selected = lessons.find(l => l.id === selectedLessonId);
    if (selected) {
      setLesson(selected);
      setCode(selected.defaultCode);
      setOutput('');
      setError('');
      setSelectedOption('');
      setQuizResult('');
    }
  }, [selectedLessonId]);

  const runCode = () => {
    setOutput('');
    setError('');
    const capturedLogs: string[] = []; 
    const originalConsoleLog = console.log;

    try {
      console.log = ((...args: any[]) => {
        capturedLogs.push(args.map(String).join(' '));
      }) as any;

      new Function(code)();
      
      console.log = originalConsoleLog;
      
      setOutput(capturedLogs.join('\n'));

    } catch (err: any) {
      console.log = originalConsoleLog; 
      setError(err.message);
    }
  };

  const checkAnswer = () => {
    if (selectedOption === lesson.quiz.answer) {
      setQuizResult('✔️ إجابة صحيحة');
    } else {
      setQuizResult('❌ إجابة خاطئة');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      flexWrap: 'wrap'
    }}>
      {/* الشريط الجانبي */}
      <div style={{
        width: '100%',
        maxWidth: 250,
        background: '#1e1e2f',
        color: '#fff',
        padding: 20,
        flexShrink: 0
      }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>الدروس</h2>
        {lessons.map((l) => (
          <div
            key={l.id}
            onClick={() => setSelectedLessonId(l.id)}
            style={{
              padding: 10,
              cursor: 'pointer',
              backgroundColor: selectedLessonId === l.id ? '#3949ab' : 'transparent',
              borderRadius: 6,
              marginBottom: 5,
              color: selectedLessonId === l.id ? '#fff' : '#ccc',
              transition: '0.3s'
            }}
          >
            {l.title}
          </div>
        ))}
      </div>

      {/* محتوى الدرس */}
      <div style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#fdfdfd',
        minWidth: 300
      }}>
        <h1 style={{ color: '#1565c0' }}>{lesson.title}</h1>
        <pre style={{
          whiteSpace: 'pre-wrap',
          backgroundColor: '#e3f2fd',
          padding: 15,
          borderRadius: 8,
          border: '2px solid #64b5f6'
        }}>
          {lesson.description}
        </pre>

        <h2 style={{ color: '#1565c0' }}>تمرين:</h2>
        <p>{lesson.challenge}</p>

        <textarea
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: 16,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            border: '2px solid #64b5f6',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />

        <button onClick={runCode} style={{
          padding: '12px 24px',
          fontSize: 16,
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          transition: '0.3s',
          marginBottom: 20
        }}>
          تشغيل الكود
        </button>

        <div style={{ marginTop: 20 }}>
          <h3>النتيجة:</h3>
          <pre style={{
            backgroundColor: '#263238',
            color: '#00e676',
            padding: 15,
            borderRadius: 8,
            minHeight: 80
          }}>
            {error ? `خطأ: ${error}` : output || 'لم يتم تشغيل الكود بعد'}
          </pre>
        </div>

        <div style={{ marginTop: 30 }}>
          <h2 style={{ color: '#1565c0' }}>اختبار سريع:</h2>
          <p>{lesson.quiz.question}</p>
          {lesson.quiz.options.map((opt, idx) => (
            <div key={idx} style={{ marginBottom: 5 }}>
              <label>
                <input
                  type="radio"
                  name="quiz"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{ marginRight: 8 }}
                />
                {opt}
              </label>
            </div>
          ))}
          <button onClick={checkAnswer} style={{
            marginTop: 10,
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}>
            تحقق من الإجابة
          </button>
          {quizResult && <p style={{ marginTop: 10, fontWeight: 'bold' }}>{quizResult}</p>}
        </div>
      </div>
    </div>
  );
}
