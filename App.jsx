// App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import './App.css';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import Statistics from './components/Statistics';

function App() {
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const SUBSCRIPTION_TYPES = {
    monthly: { name: 'חודשי', price: 300 },
    combined: { name: 'משולב', price: 650 },
    oneTime: { name: 'חד פעמי', price: 80 }
  };

  // Load customers from Firestore
  useEffect(() => {
    setLoading(true);
    const customersRef = collection(db, 'customers');
    
    const unsubscribe = onSnapshot(customersRef, (snapshot) => {
      const customersData = [];
      snapshot.forEach((doc) => {
        customersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setCustomers(customersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    }, (error) => {
      console.error('שגיאה בטעינת נתונים:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addCustomer = async (customerData) => {
    try {
      const newCustomer = {
        ...customerData,
        subscriptionType: customerData.subscriptionType,
        price: SUBSCRIPTION_TYPES[customerData.subscriptionType].price,
        startDate: new Date(customerData.startDate).toISOString(),
        createdAt: new Date().toISOString(),
        status: 'פעיל',
        notes: customerData.notes || ''
      };

      if (customerData.subscriptionType === 'monthly') {
        const renewalDate = new Date(customerData.startDate);
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        newCustomer.renewalDate = renewalDate.toISOString();
      }

      await addDoc(collection(db, 'customers'), newCustomer);
      return true;
    } catch (error) {
      console.error('שגיאה בהוספת לקוח:', error);
      return false;
    }
  };

  const updateCustomer = async (id, updatedData) => {
    try {
      const customerRef = doc(db, 'customers', id);
      await updateDoc(customerRef, updatedData);
      return true;
    } catch (error) {
      console.error('שגיאה בעדכון לקוח:', error);
      return false;
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await deleteDoc(doc(db, 'customers', id));
      return true;
    } catch (error) {
      console.error('שגיאה במחיקת לקוח:', error);
      return false;
    }
  };

  const getFilteredCustomers = () => {
    let filtered = customers;

    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.subscriptionType === filterType);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <div className="app">
      <header className="app-header">
        <h1>ניהול מנויים - CRM</h1>
        <p className="subtitle">מערכת ניהול לקוחות וחיובים</p>
      </header>

      <nav className="main-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 לוח קדמי
        </button>
        <button
          className={`nav-btn ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          👥 לקוחות
        </button>
        <button
          className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ הוסף לקוח
        </button>
        <button
          className={`nav-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📈 סטטיסטיקה
        </button>
      </nav>

      <main className="main-content">
        {loading && <div className="loading">טוען נתונים...</div>}

        {!loading && activeTab === 'dashboard' && (
          <Dashboard customers={customers} subscriptionTypes={SUBSCRIPTION_TYPES} />
        )}

        {!loading && activeTab === 'customers' && (
          <>
            <div className="filter-section">
              <input
                type="text"
                placeholder="חפש לפי שם, אימייל או טלפון..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">כל המנויים</option>
                <option value="monthly">חודשי</option>
                <option value="combined">משולב</option>
                <option value="oneTime">חד פעמי</option>
              </select>
              <span className="result-count">
                {filteredCustomers.length} לקוחות
              </span>
            </div>
            <CustomerList
              customers={filteredCustomers}
              subscriptionTypes={SUBSCRIPTION_TYPES}
              onUpdate={updateCustomer}
              onDelete={deleteCustomer}
            />
          </>
        )}

        {!loading && activeTab === 'add' && (
          <AddCustomer
            onAdd={addCustomer}
            subscriptionTypes={SUBSCRIPTION_TYPES}
            onSuccess={() => setActiveTab('customers')}
          />
        )}

        {!loading && activeTab === 'stats' && (
          <Statistics customers={customers} subscriptionTypes={SUBSCRIPTION_TYPES} />
        )}
      </main>
    </div>
  );
}

export default App;
