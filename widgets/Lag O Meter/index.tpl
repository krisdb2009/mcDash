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
    $val = abs(round(500 - (500 * ($ver[0]->success->clockRate / $ver[0]->success->expectedClockRate))));
    if($val >= 100)
    {
        $val = 100;
    }
    if($val <= 0)
    {
        $val = 0;
    }
    echo '<span>'.$val.'%</span>';
    echo '
    <script>
        var opts = {
      lines: 12,
      angle: 0,
      lineWidth: 0.13,
      pointer: {
        length: 0.9,
        strokeWidth: 0.057,
        color: \'#000000\'
      },
      limitMax: \'false\',
      colorStart: \'#00CFB3\',
      colorStop: \'#57AADA\',
      strokeColor: \'#E0E0E0\',
      generateGradient: true
    };
    var target = document.getElementById(\'LagOMeter\');
    var gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 100;
    gauge.animationSpeed = 1;
    gauge.set("'.$val.'"); // set actual value
    </script>
    <canvas id="LagOMeter"></canvas>
    ';
    ?>
</div>