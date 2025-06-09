<script>
  function updateDateTime() {
    const now = new Date();

    // Time in 12-hour format with AM/PM
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Date in DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = now.getFullYear();
    const date = `${day}/${month}/${year}`;

    document.getElementById('datetime').innerHTML = `${time} | ${date}`;
  }

  setInterval(updateDateTime, 1000);
  updateDateTime(); // Initial call
</script>
