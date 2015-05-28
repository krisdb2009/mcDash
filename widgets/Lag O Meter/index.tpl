<br>
<div style="color:black;font-size:30px;">
    <?php
    $ver = sendjson('server.performance.tick_health' , '""');
    $ver = json_decode($ver);
    if(!isset($ver[0]->success))
    {
        echo 'Server is offline.';
        exit;
    }
    echo '<span>'.abs(round(100 - (100 * ($ver[0]->success->clockRate / $ver[0]->success->expectedClockRate)))).'%</span>';
    echo '<script>
        var opts = {
      lines: 12, // The number of lines to draw
      angle: 0, // The length of each line
      lineWidth: 0.13, // The line thickness
      pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.057, // The rotation offset
        color: \'#000000\' // Fill color
      },
      limitMax: \'false\',   // If true, the pointer will not go past the end of the gauge
      colorStart: \'#00CFB3\',   // Colors
      colorStop: \'#57AADA\',    // just experiment with them
      strokeColor: \'#E0E0E0\',   // to see which ones work best for you
      generateGradient: true
    };
    var target = document.getElementById(\'LagOMeter\'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.animationSpeed = 1; // set animation speed (32 is default value)
    gauge.set("'.abs(round(100 - (100 * ($ver[0]->success->clockRate / $ver[0]->success->expectedClockRate)))).'"); // set actual value
    </script>
    <canvas id="LagOMeter"></canvas>
    ';
    ?>
</div>