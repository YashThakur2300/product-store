 import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const PRODUCTS_PER_PAGE = 8

export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltering, setIsFiltering] = useState(false)

  // Fetch products on the client side instead of server side
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError('Could not load products. Please try again.')
      }
    }
    loadProducts()
  } [], [])

  
