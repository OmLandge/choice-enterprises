export const parseCSV = (file: File): Promise<Array<Record<string, string>>> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim() !== '');
          const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
          
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
            return headers.reduce((obj, header, index) => {
              obj[header] = values[index] || '';
              return obj;
            }, {} as Record<string, string>);
          });
          
          resolve(cleanParsedCSV(data));
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  function cleanParsedCSV(data: Array<Record<string, string>>): Array<Record<string, string>> {
    return data.map(row => {
      const cleanedRow: Record<string, string> = {};
  
      for (const key in row) {
        const cleanKey = key.replace(/^"+|"+$/g, '').trim(); // removes leading/trailing quotes
        cleanedRow[cleanKey] = row[key].replace(/^"+|"+$/g, '').trim(); // also cleans the value
      }
  
      return cleanedRow;
    });
  }
  